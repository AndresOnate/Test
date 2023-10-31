package edu.eci.arsw.typefight.model;

import java.util.ArrayList;

public class Player {
    private String name;
    private String color;
    private int health;
    private int points;

    public Player(String name, String color){
        this.name = name;
        this.color = color;
        health = 100;
        points = 0;

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getHealth() {
        return health;
    }

    public void setHealth(int health) {
        this.health = health;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public void addPoints(int points) {
        this.points += points;
    }

    @Override
    public String toString() {
        return "Player{" +
                "name='" + name + '\'' +
                ", color='" + color + '\'' +
                ", health=" + health +
                ", points=" + points +
                '}';
    }
}
