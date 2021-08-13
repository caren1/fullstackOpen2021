import React from 'react'
import Statistic from './Statistic'

const Statistics = ({ good, neutral, bad }) => {

    const total = good + neutral + bad;

    const countAverage = function(good, neutral, bad){
        let average = ((good * 1) + (neutral * 0) + (bad * -1)) / total;
        return average;
      }
    
      const countPercentage = function(good){
        let percentage = (good/total) * 100;
        return Math.floor(percentage);
      }

    if (!good & !neutral & !bad) return <h3>Please provide the feedback first.</h3>

    return (
        <table>
            <tbody>
                <Statistic text="Good" score={good}/>
                <Statistic text="Neutral" score={neutral}/>
                <Statistic text="Bad" score={bad}/>
                <Statistic text="Average score" score={countAverage(good, neutral, bad)}/>
                <Statistic text="Positive percentage" score={countPercentage(good)}/>
            </tbody>
        </table>
    )
}

export default Statistics
