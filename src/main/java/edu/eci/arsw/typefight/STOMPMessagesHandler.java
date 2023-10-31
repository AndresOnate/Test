package edu.eci.arsw.typefight;

import edu.eci.arsw.typefight.model.Point;
import edu.eci.arsw.typefight.model.TypeFight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class STOMPMessagesHandler {

    @Autowired
    SimpMessagingTemplate msgt;
    //ConcurrentHashMap<String, ArrayList<Point>> points;
    TypeFight typeFight = new TypeFight();

    public STOMPMessagesHandler() {
        //points = new ConcurrentHashMap<>();
    }

    @MessageMapping("showCurrentWord")
    public void getInitialWord() {
        String currentWord = typeFight.getCurrentWord(); // Obtén la palabra actual desde tu modelo TypeFight
        msgt.convertAndSend("/topic/showCurrentWord", currentWord); // Envía la palabra actual a todos los jugadores.
    }

    @MessageMapping("catchword")
    public void handleWordEvent(String word) throws Exception {
        System.out.println("Palabra escrita!:"+word);
        typeFight.deleteWord(word);
        //points.putIfAbsent(numdibujo, new ArrayList<>());
        //ArrayList<Point> specificPoints = points.get(numdibujo);
        //specificPoints.add(pt);
        msgt.convertAndSend("/topic/catchword", word);
    }
}
