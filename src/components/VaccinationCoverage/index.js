import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {lastSevenDaysVaccinationData} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toFixed(1)}k`
    }
    return number.toString()
  }

  return (
    <>
      <h1 style={{color: '#94a3b8'}} className="vaccination-heading">
        Vaccination Coverage
      </h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={lastSevenDaysVaccinationData}
          margin={{top: 20, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="vaccine_date"
            tick={{stroke: 'gray', strokeWidth: 1}}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{stroke: 'gray', strokeWidth: 0}}
          />
          <Legend />
          <Bar dataKey="dose_1" name="Dose 1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="dose_2" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default VaccinationCoverage
