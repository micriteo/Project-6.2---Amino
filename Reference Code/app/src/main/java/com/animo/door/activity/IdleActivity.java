package com.animo.door.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;

import com.animo.door.R;
import com.animo.door.service.BackLight;
import com.animo.door.service.RGBLight;
import com.animo.door.service.Recipe;
import com.animo.door.view.CustomProgressCircle;
import com.animo.door.view.CustomTextViewALSLight;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.ThreadLocalRandom;

public class IdleActivity extends Activity {

    private static final int BREWING_CODE = 1;

    private static final HashMap<String, Integer> coffeeList;

    static {
        coffeeList = new HashMap<>();
        coffeeList.put("Espresso", R.drawable.iconx2_004_espresso);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        try {
            RGBLight.setColor(100, 100, 100);
            BackLight.setBackLight(BackLight.BackLightBrightness.HUNDERD);
        } catch (NullPointerException e) {
            Log.e("IdleActivity", "Error initializing RGBLight or BackLight", e);
            // You can handle the error more appropriately based on your application's requirements
        }

        // Set layout
        setContentView(R.layout.activity_idle);

        // Make app full screen in case we haven't yet.
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_IMMERSIVE);

        ImageView logo = findViewById(R.id.logo);

        // Creating a list of keys (coffee names)
        ArrayList<String> coffeeNames = new ArrayList<>(coffeeList.keySet());

        logo.setOnClickListener(v -> {
            int randomCoffeeIndex = ThreadLocalRandom.current().nextInt(coffeeNames.size());
            String randomCoffee = coffeeNames.get(randomCoffeeIndex);
            int imageResource = coffeeList.get(randomCoffee);

            Intent i = new Intent(this, BrewingActivity.class);
            i.putExtra(BrewingActivity.RECIPE_KEY, randomCoffee);
            i.putExtra(BrewingActivity.IMAGE_KEY, imageResource);
            startActivityForResult(i, BREWING_CODE);
            overridePendingTransition(0, 0);
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == BREWING_CODE) {
            Log.i("Idle", "Completed brewing.");
            try {
                RGBLight.setColor(100, 100, 100);
            } catch (NullPointerException e) {
                Log.e("IdleActivity", "Error setting color on RGBLight", e);
            }
            return;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }
}
