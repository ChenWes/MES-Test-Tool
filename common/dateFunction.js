import moment from 'moment';

/**
 * 获取两个日期的天数间隔
 * @param {*} StartDate 
 * @param {*} EndDate 
 */
const DayDiffTwoDate = (StartDate, EndDate) => {
    if (StartDate == EndDate) return 0;

    return Math.round(
        (moment(EndDate) - moment(StartDate)) / (1000 * 60 * 60 * 24)
    );
}

/**
 * 获取两个日期的中间日期列表
 * @param {*} StartDate 
 * @param {*} EndDate 
 */
const GetDayListBetweenToDate = (StartDate, EndDate) => {
    let daysList = []
    let newStartDate = moment(StartDate).format('YYYY-MM-DD');
    let newEndDate = moment(EndDate).format('YYYY-MM-DD');

    if (StartDate > newEndDate) {
        newStartDate = moment(EndDate).format('YYYY-MM-DD');
        newEndDate = moment(StartDate).format('YYYY-MM-DD');
    }

    //两个日期的中间天数间隔
    let days = DayDiffTwoDate(newStartDate, newEndDate);

    for (let idx = 0; idx <= days; idx++) {
        daysList.push(
            moment(newStartDate).add(idx, 'days').format('YYYY-MM-DD')
        )
    }

    return daysList;
}

export {
    DayDiffTwoDate,
    GetDayListBetweenToDate
}