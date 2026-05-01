import React from 'react'
import { Box, Typography, Grid, Card, CardMedia, CardContent, Chip } from '@mui/material';

// استيراد الصور
import House1 from '../../assets/images/hotals1 (1).png';
import House2 from '../../assets/images/hotals1 (2).png';
import House3 from '../../assets/images/hotals1 (3).png';
import House4 from '../../assets/images/hotals1 (4).png';

const housesData = [
  { id: 1, name: 'Green Park', location: 'Tangerang, Indonesia', image: House1, popular: false },
  { id: 2, name: 'Podo Wae', location: 'Madiun, Indonesia', image: House2, popular: false },
  { id: 3, name: 'Silver Rain', location: 'Bandung, Indonesia', image: House3, popular: false },
  { id: 4, name: 'Cashville', location: 'Kemang, Indonesia', image: House4, popular: true },
];
export default function Hotels() {
  return (
    <>
        <Box sx={{ padding: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: '500', mb: 3, color: '#152C5B' }}>
            Hotels with large living room
          </Typography>
    
          <Grid container spacing={2}>
            {housesData.map((house) => (
              <Grid item size={3} key={house.id}>
                <Card sx={{ borderRadius: '15px', boxShadow: 'none', position: 'relative', backgroundColor: 'transparent' }}>
                  
                  {house.popular && (
                    <Chip 
                      label="Popular Choice" 
                      sx={{ 
                        position: 'absolute', top: 0, left: 0, zIndex: 1,
                        backgroundColor: '#FF498C', color: 'white',
                        borderRadius: '0 0 15px 0', fontSize: '0.7rem', fontWeight: 'bold'
                      }} 
                    />
                  )}
    
                  <Box sx={{ overflow: 'hidden', borderRadius: '15px' }}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={house.image}
                      alt={house.name}
                      sx={{ transition: '0.3s', '&:hover': { transform: 'scale(1.1)' } }}
                    />
                  </Box>
                  
                  <CardContent sx={{ px: 0 }}>
                    <Typography variant="h6" sx={{ fontSize: '1.1rem', color: '#152C5B', fontWeight: 'bold' }}>
                      {house.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                      {house.location}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
    </>
  )
}
