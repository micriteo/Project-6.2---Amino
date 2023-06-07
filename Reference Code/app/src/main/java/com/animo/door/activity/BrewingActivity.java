package com.animo.door.activity;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;

import com.animo.door.R;
import com.animo.door.service.BackLight;
import com.animo.door.service.RGBLight;
import com.animo.door.service.Recipe;
import com.animo.door.service.SoundService;
import com.animo.door.view.CustomProgressCircle;
import com.animo.door.view.CustomTextViewALSLight;

import okhttp3.Request;
import okhttp3.*;
import java.io.IOException;
import android.util.Log;
public class BrewingActivity extends Activity {

    public static final String RECIPE_KEY = "selected_recipe";

    private CustomTextViewALSLight textBrewName;
    private CustomProgressCircle progressCircle;
    private ImageView brewIcon;
    private Handler fakeTimer;

    private int brewProgress = 0;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //set layout
        setContentView(R.layout.activity_brewing);

        // Make app full screen in case we havent yet.
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_IMMERSIVE);

        ImageView backgroundImage = (ImageView) findViewById(R.id.imgInfoBackground);
        backgroundImage.setImageResource(R.drawable.bk_brew);

        //link all items to layout
        brewIcon = (ImageView) findViewById(R.id.foregroundImg);
        textBrewName = (CustomTextViewALSLight) findViewById(R.id.text_description2);
        progressCircle = (CustomProgressCircle) findViewById(R.id.circle);
        progressCircle.setFilledPercentage(0);

        fakeTimer = new Handler();
    }


    @Override
    public void onResume() {
        super.onResume();

        // Set RGB to red
        RGBLight.setColor(70, 0, 0);

        //find selected recipe
        int recipe = getIntent().getIntExtra(RECIPE_KEY, -1);
        if (recipe < 0 || recipe > Recipe.VALUES.length) {
            Log.w("BREW", "Failed finding recipe of " + recipe);
            finish();
            return;
        }
        Recipe selectedRecipe = Recipe.VALUES[recipe];
        textBrewName.setText(selectedRecipe.getName());
        brewIcon.setImageResource(selectedRecipe.getDrawableID());
        Log.i("BREW", "Starting brew of " + selectedRecipe.getName());

        doFakeBrewing();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    private void doFakeBrewing() {
        fakeTimer.postDelayed(() -> {
            progressCircle.setFilledPercentage(brewProgress++);
            if (brewProgress >= 100) {
                SoundService.playReadySound();
                finish();
            } else {
                doFakeBrewing();
            }
        }, 200);

    }

}
