package com.animo.door.view;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;

import java.util.Timer;
import java.util.TimerTask;

/**
 * Implementation of a Progress Circle.
 */
public class CustomProgressCircle extends View {

    public static final int StrokeSize = 4;
    public static final int StrokeOuterCircle = 12;

    private int baseColor;
    private int highLightColor;

    private final Path arcPath = new Path();
    private final Paint paint = new Paint();
    private final Paint maskingPaint;
    private final RectF rectF;
    private int sweep = 0;

    private int startingRotation = 0;
    private int currentRotation = 0;
    private int currentAnimationIndex = 0;
    private boolean isProgressAnimated = false;

    private Timer timer = new Timer(); //used for rotating the circle.
    private Timer progressTimer = new Timer(); //used for animating the circle.


    public CustomProgressCircle(Context context, AttributeSet attrs) {
        super(context, attrs);

        baseColor = 0xFFCCCCCC; //white
        highLightColor = 0xFFE67E3E; //Animo Orange

        paint.setAntiAlias(true); // Start anti-aliasing
        paint.setShadowLayer(4, 2, 2, 0x80000000);

        maskingPaint = new Paint(paint); //copy whatever paint we had
        rectF = new RectF(0, 0, 0, 0); //rectF used for calculations for the circle bounds. Create once, recycle.
    }

    @Override
    public void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        rectF.set(StrokeOuterCircle, StrokeOuterCircle, getMeasuredWidth() - StrokeOuterCircle, getMeasuredHeight() - StrokeOuterCircle);

        // Draw circle fully (background)
        paint.setColor(baseColor);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(StrokeSize);
        canvas.drawOval(rectF, paint);

        //draw the full part of the circle.
        paint.setColor(highLightColor);
        int startAngle = startingRotation - 90 + currentRotation; //rotation - 90 as circles start on 3 'o clock.
        canvas.drawArc(rectF, startAngle, sweep, false, paint);

        if (isProgressAnimated) {
            //make our arc path
            arcPath.reset(); //reset first. We're recycling this object.
            int halfStroke = (StrokeSize / 2) + 1;
            rectF.set(StrokeOuterCircle - halfStroke, StrokeOuterCircle - halfStroke, getMeasuredWidth() - (StrokeOuterCircle - halfStroke), getMeasuredHeight() - (StrokeOuterCircle - halfStroke));
            arcPath.arcTo(rectF, startAngle, sweep);
            rectF.set(StrokeOuterCircle + halfStroke, StrokeOuterCircle + halfStroke, getMeasuredWidth() - StrokeOuterCircle - halfStroke, getMeasuredHeight() - StrokeOuterCircle - halfStroke);
            arcPath.arcTo(rectF, startAngle + sweep, -sweep);
            arcPath.close();
            canvas.clipPath(arcPath); //clip it

            maskingPaint.setStrokeWidth(halfStroke * 2);
            maskingPaint.setColor(((highLightColor & 0xFEFEFE) >> 1) | 0xFF000000); //make it 50% (approx) darker, through magic

            int center = getMeasuredWidth() / 2; //should be the same for X and Y as our circle should always be square.

            for (int i = currentAnimationIndex % (halfStroke * 4); i < 360; i += halfStroke * 4) { //points on the circle. start at currentRotation
                //lines in circle formation
                float circleX = (float) (center + (center * Math.cos(i * Math.PI / 180)));
                float circleY = (float) (center + (center * Math.sin(i * Math.PI / 180)));
                canvas.drawLine(center, center, circleX, circleY, maskingPaint);
            }
        }
    }

    public void restart() {
        currentRotation = 0;
        invalidate();
    }

    public void setFilledPercentage(float percentage, boolean allowGoingBack) {
        int newSweep = (int) ((percentage * 360 / 100) % 360); //convert a 0-100% value to 0-360 circle degrees
        if (!allowGoingBack && newSweep < sweep) {
            return;
        }
        sweep = newSweep;
        this.invalidate();
    }

    public void setFilledPercentage(float percentage) {
        setFilledPercentage(percentage, true);
    }

    public void setDefaultIdling() {
        setFilledPercentage(30);
        setRotationSpeed(4000);
    }

    public void setRotationSpeed(int rotationTimeMs) {
        resetTimer();
        if (rotationTimeMs > 0) {
            long mstime = rotationTimeMs / 360; //we want it 360 times as fast basically.
            int addition = 1;
            while (mstime < 25) { //we dont want to update it more than once every +-25 (arbitrary) milliseconds, so double the addition and half the mstime whilst below this.
                addition++;
                mstime = rotationTimeMs / (360 / addition);
            }
            final int finalAddition = addition;
            timer.scheduleAtFixedRate(new TimerTask() {
                @Override
                public void run() {
                    currentRotation = (currentRotation + finalAddition) % 360;
                    getRootView().post(() -> invalidate());
                }
            }, 0, mstime);
        }
        this.invalidate();
    }

    public void doProgressAnimation() {
        resetProgressTimer();
        isProgressAnimated = true;
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                currentAnimationIndex++;
                getRootView().post(() -> invalidate());
            }
        }, 0, 50); //by default use 50 ms to animate it. will move 20 times a second in this case.
        this.invalidate();
    }

    private void resetProgressTimer() {
        currentAnimationIndex = 0;
        isProgressAnimated = false;
        try {
            progressTimer.cancel();
            progressTimer.purge();
        } catch (Exception e) {
            Log.e("CustomProgressCircle", "Failed to cancel progresstimer!", e);
        }
        progressTimer = new Timer();
    }

    private void resetTimer() {
        try {
            timer.cancel();
            timer.purge();
        } catch (Exception e) {
            Log.e("CustomProgressCircle", "Failed to cancel timer!", e);
        }
        timer = new Timer();
    }

    public void setStartingRotation(int startingRotation) {
        this.startingRotation = startingRotation;
        this.invalidate();
    }

    public void setColors(int baseColor, int highlightColor) {
        this.baseColor = baseColor;
        this.highLightColor = highlightColor;
        this.invalidate();
    }

    /**
     * Resets the progress circle and stops and running timers.
     */
    public void cancel() {
        sweep = 0;
        startingRotation = 0;
        currentRotation = 0;
        resetTimer();
        resetProgressTimer();
        this.invalidate();
    }
}
