/**
 * Format time in seconds to human readable format
 *
 * @param {number} seconds The time in seconds
 * @returns {string} The formatted time
 */
export default function formatTime(seconds: number) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + "d " : "";
    var hDisplay = h > 0 ? h + "h " : "";
    var mDisplay = m > 0 ? m + "m " : "";
    var sDisplay = s > 0 ? s + "s" : "";
    return dDisplay + (!d ? hDisplay : "") + (!d ? mDisplay : "") + (!h ? sDisplay : "");
}
