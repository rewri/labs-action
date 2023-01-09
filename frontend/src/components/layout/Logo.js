import Avatar from '@mui/material/Avatar';
import React from 'react';

export default function Logo({ width = 160, height = 160, pl = 7 }) {
  return (
    <div>
      <Avatar
        alt="Labs action"
        src="/assets/images/logo-labsaction.png"
        sx={{ width: width, height: height, pl: pl, pt: 2 }}
        variant="square"
      />
    </div>
  )
}
