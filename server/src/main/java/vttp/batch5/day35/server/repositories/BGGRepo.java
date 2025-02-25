package vttp.batch5.day35.server.repositories;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class BGGRepo {
    @Autowired
    private MongoTemplate template;

    public static final String C_GAMES = "games";

    /*
        db.games.find({ 
            name: {
                $regex: q,
                $options: 'i'
            }
        })
        .sort({ name: 1 })
        .limit(2)
        .projection({
            _id: 0,
            gid: 1,
            name: 1
        })
     */
    public List<Document> findGamesByName(String q, int count) {
        // Define search criteria
        Criteria criteriaByName = Criteria.where("name").regex(q, "i");
        
        // Create query
        Query query = Query.query(criteriaByName)
                    .with(Sort.by(Sort.Direction.ASC, "name"))
                    .limit(5);

        // Projection (choose attr to display)
        query.fields()
        .exclude("_id")
        .include("gid")
        .include("name");

        // return template.find(query, Document.class, C_GAMES)
        //         .stream()
        //         .map(d -> d.getInteger("gid"))
        //         .toList();
        return template.find(query, Document.class, C_GAMES);
    }


}
