import { DEVICE_WIDTH } from 'config/metrics';

const scaleFont = ( initialSize ) => (
    Math.round(initialSize * DEVICE_WIDTH / 375)
)

export default scaleFont;