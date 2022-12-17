import React, { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'

export type TModalView = {
  show: boolean
  handler: (val: string) => void
}

const ModalView: React.FC<TModalView> = ({ show, handler }) => {
  const [name, setName] = useState<string>('')
  return (
    <Dialog
      maxWidth={'md'}
      open={show}
    >
      <DialogTitle>Enter your name:</DialogTitle>
      <DialogContent>
        <Box my={1}>
          <TextField
            onChange={(e) => setName(e.target.value)}
            label='Your name'
            variant={'outlined'}
            helperText={(name.length < 2) ? 'Username should be not less 2 chars' : ''}
            autoFocus
            fullWidth
            required
            autoComplete='off'
            onKeyDown={(e) => (e.key === 'Enter' && name.length >= 2) && handler.call(void 0, name)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Stack direction={'row'} mx={'auto'} my={1}>
          <Button variant={'outlined'} onClick={handler.bind(void 0, name)} disabled={name.length < 2}>OK</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}

export default ModalView