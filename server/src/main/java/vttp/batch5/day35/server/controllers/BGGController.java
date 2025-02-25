package vttp.batch5.day35.server.controllers;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import vttp.batch5.day35.server.services.BGGService;

@RestController
@RequestMapping("/api")
public class BGGController {
    @Autowired
    private BGGService bggSvc;

    @GetMapping("/search")
    public ResponseEntity<String> findGamesByName(@RequestParam String q, @RequestParam(defaultValue="10") int count) {
        
        List<Document> games = bggSvc.findGamesByName(q, count);

        JsonArrayBuilder jAB = Json.createArrayBuilder();
        for (Document d : games) {
            JsonObject j = Json.createObjectBuilder()
                        .add("gid", d.getInteger("gid"))
                        .add("name", d.getString("name"))
                        .build();

            jAB.add(j);
        }

        return ResponseEntity.ok(jAB.build().toString());
    }
}
