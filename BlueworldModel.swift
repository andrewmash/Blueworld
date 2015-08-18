//
//  BlueworldModel.swift
//  Blueworld
//
//  Created by Andrew Ash on 11/21/14.
//  Copyright (c) 2014 Andrew Ash. All rights reserved.
//

import Foundation

var oldGen = [Cell]()
var newGen = [Cell]()

struct Matrix {
    let rows: Int, columns: Int
    var grid: [Cell]
    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        grid = Array(count: rows * columns, repeatedValue: Cell())
        for i in 0..<rows {
            for j in 0..<columns {
                self[i, j].environment = self
            }
        }
    }
    func indexIsValidForRow(row: Int, column: Int) -> Bool {
        return row >= 0 && row < rows && column >= 0 && column < columns
    }
    subscript(row: Int, column: Int) -> Cell {
        get {
            assert(indexIsValidForRow(row, column: column), "Index out of range")
            return grid[(row * columns) + column]
        }
        set {
            assert(indexIsValidForRow(row, column: column), "Index out of range")
            grid[(row * columns) + column] = newValue
        }
    }
}

class Cell {
    var isAlive = false
    var environment: Matrix = Matrix(rows: 0, columns: 0)
    var neighbors: [Cell] {
        var neighbors = [Cell]()
        for i in -1...1 {
            for j in -1...1 {
                if i != 0 || j != 0 {
                    neighbors.append(environment[i, j])
                }
            }
        }
        return neighbors
    }
    var willBeAlive: Bool {
        var population = 0
        for neighbor in neighbors {
            if neighbor.isAlive {
                ++population
            }
        }
        if population < 2 || population > 3 {
            return false
        }
        if population == 2 && isAlive == false {
            return false
        }
        return true
    }
}