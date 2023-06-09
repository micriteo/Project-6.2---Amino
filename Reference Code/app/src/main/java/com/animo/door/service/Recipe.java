package com.animo.door.service;

import com.animo.door.R;

import java.util.Locale;

/**
 * Dummy recipes made for this project
 */
public enum Recipe {
    COFFEE(R.drawable.coffee),
    ESPRESSO(R.drawable.espresso),
    MILK_COFEE(R.drawable.milk_coffee),
    CAPUCINO(R.drawable.capucino),
    CHOCOLATE_COFFEE(R.drawable.chocolate_coffee),
    CHOCOLATE_MILK(R.drawable.chocolate_milk),
    DOUBLE_ESPRESSO(R.drawable.double_espresso),
    LATE_MACHIATO(R.drawable.late_machiato),
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
}
