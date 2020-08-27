function getTime() {
            let currentTime = new Date();

            let currentOffset = currentTime.getTimezoneOffset();

            let ISTOffset = 330;

            let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);


            let hoursIST = ISTTime.getHours()
            let minutesIST = ISTTime.getMinutes()

            let time = hoursIST + ":" + minutesIST;

            return time;

}

module.exports = {
            getTime
}