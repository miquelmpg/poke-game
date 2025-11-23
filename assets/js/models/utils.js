class Utils {
    static debugDrawable(drawable) {
        if (DEBUG) {
            drawable.ctx.save();
            drawable.ctx.strokeStyle = 'red';
            drawable.ctx.strokeRect (
                drawable.x,
                drawable.y,
                drawable.w,
                drawable.h
            )
            drawable.ctx.restore();
        }
    }
}