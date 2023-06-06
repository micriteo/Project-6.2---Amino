package com.animo.door.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;

import com.animo.door.R;
import com.animo.door.service.BackLight;
import com.animo.door.service.RGBLight;
import com.animo.door.service.SoundService;
import com.animo.door.view.CustomProgressCircle;
import com.animo.door.view.CustomTextViewALSLight;

public class BrewingActivity extends Activity {

    public static final String RECIPE_KEY = "selected_recipe";
    public static final String IMAGE_KEY = "selected_image";

    private CustomTextViewALSLight textBrewName;
    private CustomProgressCircle progressCircle;
    private ImageView brewIcon;
    private Handler fakeTimer;

    private int brewProgress = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set layout
        setContentView(R.layout.activity_brewing);

        // Make app full screen in case we haven't yet.
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_IMMERSIVE);

        ImageView backgroundImage = findViewById(R.id.imgInfoBackground);
        backgroundImage.setImageResource(R.drawable.bk_brew);

        // Link all items to layout
        brewIcon = findViewById(R.id.foregroundImg);
        textBrewName = findViewById(R.id.text_description2);
        progressCircle = findViewById(R.id.circle);
        progressCircle.setFilledPercentage(0);

        fakeTimer = new Handler();
    }

    @Override
    public void onResume() {
        super.onResume();

        // Set RGB to red
        RGBLight.setColor(70, 0, 0);

        // Find selected recipe and image resource
        Intent intent = getIntent();
        String recipe = intent.getStringExtra(RECIPE_KEY);
        int imageResource = intent.getIntExtra(IMAGE_KEY, -1);

        if (recipe == null || imageResource == -1) {
            Log.w("BREW", "Failed finding recipe or image resource");
            finish();
            return;
        }

        textBrewName.setText(recipe);
        brewIcon.setImageResource(imageResource);
        Log.i("BREW", "Starting brew of " + recipe);

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
