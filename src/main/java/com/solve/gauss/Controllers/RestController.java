package com.solve.gauss.Controllers;

import com.solve.gauss.models.DataMatrix;

import com.solve.gauss.models.SLAU;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.HashMap;


@org.springframework.web.bind.annotation.RestController
public class RestController {
    private double[] x;

    @PostMapping(value = "/solve", produces = MediaType.APPLICATION_JSON_VALUE)
    public void solve(@RequestBody DataMatrix data) {
        SLAU system = new SLAU(data.size, data.matrix);
        x = system.solveMatrix();
    }

    @GetMapping(value = "/solve", produces = MediaType.APPLICATION_JSON_VALUE)
    public HashMap<String, double[]> getAnswer() {
        HashMap<String, double[]> json = new HashMap<>();
        json.put("roots", x);
        return json;
    }
}
