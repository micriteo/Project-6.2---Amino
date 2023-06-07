package com.animo.door.view;

import android.animation.Animator;
import android.animation.ValueAnimator;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Path;
import android.support.annotation.Nullable;
import android.util.AttributeSet;

public class GlowableImageView extends android.support.v7.widget.AppCompatImageView {

    private static final long MS_COOLDOWN = 10_000;
    private static final long MS_DURATION = 2_500;
    private static final int ANGLE = 5; //degrees
    private static final int GLOW_SIZE = 10;
    
    private final Path maskingPath = new Path(); //define once to recycle
    
    private Bitmap glowImage;
    private ValueAnimator animator;

    public GlowableImageView(Context context) {
        super(context);
    }

    public GlowableImageView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public GlowableImageView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        if(glowImage!=null && animator.isRunning()){
            int currentOffset = (int) animator.getAnimatedValue();
            //mask a big line
            maskingPath.reset();
            maskingPath.setLastPoint(0, currentOffset);
            float rightSideOffset = currentOffset + (float) (getWidth()/Math.tan(Math.toRadians(90-ANGLE)));
            maskingPath.lineTo(getWidth(), rightSideOffset);
            maskingPath.lineTo(getWidth(), rightSideOffset+GLOW_SIZE);
            maskingPath.lineTo(0, currentOffset+GLOW_SIZE);
            maskingPath.lineTo(0, currentOffset);
            maskingPath.close();
            canvas.clipPath(maskingPath); //clip canvas to our line
            canvas.drawBitmap(glowImage, 0, 0, null); //draw the glow image
        }
    }

    /**
     * Sets the image used to display on top of the base image.
     * @param resourceID -1 if the glow should be disabled, otherwise the resource ID of the image supplied for the glow effect
     */
    public void setGlowImage(int resourceID){
        if(animator!=null){
            //clean up animator always when glowImage is set again.
            animator.cancel();
            animator = null;
        }
        if(resourceID < 0){
            glowImage = null;
            return;
        }
        glowImage = BitmapFactory.decodeResource(getResources(), resourceID);
        int rightSideOffset = (int) (getWidth()/Math.tan(Math.toRadians(90-ANGLE))); //doesn't need to be too precise, ints are fine.
        int preHeight = GLOW_SIZE + rightSideOffset + 5; //the height of our sloped masking line. Add 5 to start it slightly above our image.
        animator = ValueAnimator.ofInt(-preHeight, glowImage.getHeight()); //we start above the canvas to not have the popping effect when the animator starts.
        animator.setDuration(MS_DURATION);
        animator.setStartDelay(MS_COOLDOWN);
        animator.addListener(new Animator.AnimatorListener() {
            @Override
            public void onAnimationStart(Animator animation) {

            }

            @Override
            public void onAnimationEnd(Animator animation) {
                animator.start(); //start again when we ended
            }

            @Override
            public void onAnimationCancel(Animator animation) {

            }

            @Override
            public void onAnimationRepeat(Animator animation) {

            }
        });
        animator.addUpdateListener(animation -> invalidate());
        animator.start();
    }
}
