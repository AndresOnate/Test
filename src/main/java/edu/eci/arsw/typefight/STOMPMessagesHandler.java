package edu.eci.arsw.typefight;

import edu.eci.arsw.typefight.model.Player;
import edu.eci.arsw.typefight.model.Point;
import edu.eci.arsw.typefight.model.TypeFight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class STOMPMessagesHandler {

    @Autowired
    SimpMessagingTemplate msgt;
    TypeFight typeFight;
    int goToPlay;

    public STOMPMessagesHandler() {
        typeFight = new TypeFight();
        goToPlay = 0;
    }

    @Scheduled(fixedRate = 5000) 
    public void getInitialWord() {
        if(typeFight.getCurrentWords().size() < typeFight.MAX_CURRENT_WORDS){
            String currentWord = typeFight.getRandomWord(); // Obtén la palabra actual desde tu modelo TypeFight
            typeFight.addRandomWord(currentWord);
        }
        msgt.convertAndSend("/topic/showCurrentWord", typeFight.getCurrentWords()); // Envía la palabra actual a todos los jugadores.
    }

    @MessageMapping("catchword")
    public void handleWordEvent(String message) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> messageMap = objectMapper.readValue(message, new TypeReference<Map<String,String>>() {});

        String username = messageMap.get("username");
        String word = messageMap.get("writtenWord");

        List<String> currentWords = typeFight.getCurrentWords(); 
        if (currentWords.contains(word)) {
            for (Player player : typeFight.getPlayers()) {
                String playerName = player.getName();
                if (!playerName.equals(username)) {
                    player.decreaseHealth(word.length());
                    msgt.convertAndSend("/topic/updateHealth." + playerName, player.getHealth());
                }
            }
            typeFight.removeCurrentWord(word);
            msgt.convertAndSend("/topic/catchword", word);
        }
        if(typeFight.isThereAWinner() != null){
            msgt.convertAndSend("/topic/showWinner", typeFight.getSortedPlayers());
        }       
    }

    @MessageMapping("newplayer")
    public void handleNewPlayerEvent(String name) {
        System.out.println("Jugador añadido:" + name);
        Player player = new Player(name, typeFight.getColorByPlayers());
        typeFight.addPlayer(player);
        msgt.convertAndSend("/topic/newplayer", name);
    }

    @MessageMapping("newentry")
    public void handleNewEntry () {
        System.out.println("Entrada registrada");
        msgt.convertAndSend("/topic/newentry", typeFight.getPlayers());
        if (typeFight.getAmountOfPlayers() >= 2) {
            msgt.convertAndSend("/topic/readytoplay", true);
        }
    }

    @MessageMapping("gotoplay")
    public void handleGoToPlay () {
        System.out.println("Jugador quiere jugar!!");
        goToPlay++;
        if (goToPlay == typeFight.getPlayers().size()) {
            System.out.println("Ir a jugar!!");
            msgt.convertAndSend("/topic/gotoplay", true);
        }
    }
}
