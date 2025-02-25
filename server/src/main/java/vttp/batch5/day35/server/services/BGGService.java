package vttp.batch5.day35.server.services;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp.batch5.day35.server.repositories.BGGRepo;

@Service
public class BGGService {
    @Autowired
    private BGGRepo bggRepo;

    public List<Document> findGamesByName(String q, int count) {
        return bggRepo.findGamesByName(q, count);
    }
}
