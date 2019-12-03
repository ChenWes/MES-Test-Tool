// import express from 'express';
import _ from 'lodash'
import { PostFunction } from './common/httpHandler';
import { GetDayListBetweenToDate } from './common/dateFunction';




const startDate = '2019-08-01';
const endDate = '2019-12-01';

const dateList = GetDayListBetweenToDate(startDate, endDate);
// console.log('tttt', dateList);
Promise.all(
    dateList.map(getDate => {
        return PostFunction({
            ReportDate: getDate,
            MachineID: "",
            WorkshopID: "5c7f15e222d0b322342c3e2b"
        })
    })
).then((data) => {
    let getResult = data.map((dataItem, dataIdx) => {
        if (dataItem.dataList) {
            let allData = dataItem.dataList;


            let filterData = _.filter(allData, (t) => t.TotalHours > 24 && t.MachineCode != '总计');

            if (filterData.length) {
                const allProblemData = filterData.map(filterDataItem => {
                    return filterDataItem.MachineCode + " => " + filterDataItem.TotalHours.toFixed(2);
                })
                return {
                    date: dateList[dataIdx],
                    comment: allProblemData.join('    ')
                }
            } else {
                return null;
            }
        }
    })
    return Promise.resolve(getResult);
}).then((dataList) => {
    const finalData = dataList.filter(r => r);

    finalData.map(findDataItem => {
        console.log(`${findDataItem.date}  ${findDataItem.comment}`)
    })
}).catch(err => {
    console.log('请求方法出错', err);
})


