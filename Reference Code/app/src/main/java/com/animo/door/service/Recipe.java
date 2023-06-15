package com.animo.door.service;

import com.animo.door.R;

import java.util.Locale;

/**
 * Dummy recipes made for this project
 */
public enum Recipe {
    COFFEE(R.drawable.coffee),
    ESPRESSO(R.drawable.espresso),
    MILK_COFFEE(R.drawable.milk_coffee),
    CAPPUCCINO(R.drawable.capucino),
    CHOCOLATE_COFFEE(R.drawable.chocolate_coffee),
    CHOCOLATE_MILK(R.drawable.chocolate_milk),
    DOUBLE_ESPRESSO(R.drawable.espresso),
    LATTE_MACCHIATO(R.drawable.late_machiato),
    WIENER_MELANGE(R.drawable.wiener),
    ;

    public static final Recipe[] VALUES = values();

    private final String name;
    private final int drawableID;

    Recipe(int drawableID) {
        this.name = name().toUpperCase(Locale.ROOT).replaceAll("_", " ");
        this.drawableID = drawableID;
    }

    public String getName() {
        return name;
    }

    public int getDrawableID() {
        return drawableID;
    }

    public static Recipe fromString(String coffeeType) {
        for (Recipe type : Recipe.values()) {
            if (type.name().equalsIgnoreCase(coffeeType)) {
                return type;
            }
        }
        return null; // or throw exception
    }
}
