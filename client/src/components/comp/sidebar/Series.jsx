import React from 'react'
import './Series.css'
import Input from '../showcom/Input'

const Series = ({handleChange}) => {
  return (
    <div>
      <h2 className="sidebar-title">Series</h2>

      <div className="sidebar-label-group">
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test"/>
          <span className="checkmark"></span> All
        </label>
        <Input
          handleChange={handleChange}
          value="Seed"
          title="Gundam Seed"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Gundam Seed Destiny"
          title="Gundam Seed Destiny"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Gundam The Origin"
          title="Gundam The Origin"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Gundam Iron-Blooded Orphans"
          title="Gundam Iron-Blooded Orphans"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Gundam 00"
          title="Gundam 00"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Gundam Unicorn"
          title="Gundam Unicorn"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Gundam Thunderbolt"
          title="Gundam Thunderbolt"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Gundam AGE"
          title="Gundam AGE"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Gundam Build Fighters"
          title="Gundam Build Fighters"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Gundam ZZ"
          title="Gundam ZZ"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Zeta Gundam"
          title="Zeta Gundam"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Victory Gundam"
          title="Victory Gundam"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="G Gundam"
          title="G Gundam"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Gundam Wing"
          title="Gundam Wing"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Sangokuden "
          title="SD Gundam Sangokuden"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Hathaway "
          title="Gundam Hathaway"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="The Witch From Mercury"
          title="The Witch From Mercury"
          name="test"
        />
      </div>
    </div>
  )
}

export default Series