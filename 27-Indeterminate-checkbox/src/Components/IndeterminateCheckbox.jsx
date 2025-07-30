import React from 'react'
import Checkbox from './Checkbox'

const IndeterminateCheckbox = ({ checkboxData, handleChange }) => {
  return (
    <div className="indeterminate-checkbox">
      {/* <h1>IndeterminateCheckbox</h1> */}
      {checkboxData.map((item) => {
        return (
          <div key={item.id} className="checkbox-item">
            <Checkbox
              id={item.id}
              label={item.label}
              status={item.status}
              handleChange={handleChange}
            />
            {/* checking if it has children */}
            {item.children && item.children.length > 0 && (
              <div className="checkbox-children">
                <IndeterminateCheckbox
                  checkboxData={item.children}
                  handleChange={handleChange}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default IndeterminateCheckbox