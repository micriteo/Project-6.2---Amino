package com.animo.door.service;

import com.animo.door.R;

import java.util.Locale;

/**
 * Dummy recipes made for this project
 */
public enum Recipe {
    COFFEE(R.drawable.iconx2_000_black_coffee),
    ESPRESSO(R.drawable.iconx2_004_espresso),
    COFFEE_CHOC(R.drawable.iconx2_007_coffee_chocolate),
    HOT_WATER(R.drawable.iconx2_010_hot_water),
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
