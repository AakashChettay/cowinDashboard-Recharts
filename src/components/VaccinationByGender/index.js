import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByGender = props => {
  const {vaccinationByGenderData} = props
  return (
    <>
      <h1 style={{color: '#94a3b8'}} className="vaccination-heading">
        Vaccination By Gender
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={vaccinationByGenderData}
            startAngle={0}
            endAngle={360}
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill="#2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}

export default VaccinationByGender
