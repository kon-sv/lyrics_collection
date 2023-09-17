import React, { useState } from 'react'

import JoySwitch from '@mui/joy/Switch/Switch'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import FormHelperText from '@mui/joy/FormHelperText'

const Switch = ({label, onChange} : {label: string, onChange?: (e: boolean) => void} ) => {
  const [checked, setChecked] = useState(false)

  return <>
    

      <JoySwitch
        checked={checked}
        onChange={(event: any) => {setChecked(event.target.checked); onChange && onChange(event.target.checked)} }
        color={checked ? 'success' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        endDecorator={label}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
  </>
}

export default Switch
