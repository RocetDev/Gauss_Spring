package com.solve.gauss.models;

import java.lang.Math;

public class SLAU {

    private double[][] matrix;
    private int n;

    public SLAU(int n, double[][] matrix) {
        this.matrix=matrix;
        this.n = n;
    }


    public double[] solveMatrix() {
        double r;
        double[] x = new double[n];
        for(int i=0; i < n; i++) { // straight move of gauss
            for(int j=i+1; j < n; j++) {
                r = matrix[j][i]/matrix[i][i];
                for(int k=0; k < n+1; k++) {
                    matrix[j][k] = matrix[j][k] - r * matrix[i][k];
                }
            }
        }

        for(int i=n-1; i > -1; i--) { // back move of gauss
            for(int j=i-1; j > -1; j--) {
                r = matrix[j][i]/matrix[i][i];
                for(int k=0; k < n+1; k++) {
                    matrix[j][k] = matrix[j][k] - r * matrix[i][k];
                }
            }
            x[i] = matrix[i][n]/matrix[i][i]; // get roots of equations
        }
        return x;
    }
}
