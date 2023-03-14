import React, { useState } from 'react';
import { TextField, Button, InputAdornment, Divider, Typography } from '@mui/material';
import { RestApiService } from '../util/RestApiService';
import { ApiConstants } from '../util/ApiConstants';
import AddNewBookUi from './AddNewBookUi';
import UploadWithExcel from './UploadWithExcel';

export default function AddNewBook({ openPopup }) {

  const [isUploadExcel, setIsUploadExcel] = useState(false);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {isUploadExcel ? <UploadWithExcel /> : <AddNewBookUi openPopup={openPopup} />}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Divider style={{ height: '1.5px', width: '40%', marginRight: '10px' }} />
        <Typography variant="h6">OR</Typography>
        <Divider style={{ height: '1.5px', width: '40%', marginLeft: '10px' }} />
      </div>
      {!isUploadExcel
        ? <Button onClick={() => setIsUploadExcel(true)} type="submit" variant="contained" color="primary">
          Upload with Excel
        </Button>
        : <div></div>
      }
      {isUploadExcel
        ? <Button onClick={() => setIsUploadExcel(false)} type="submit" variant="contained" color="primary">
          Upload Manually
        </Button>
        : <div></div>
      }

    </div>
  )
}

