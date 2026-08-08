import React from 'react'
import { Box, Typography, Grid, Card, CardMedia, CardContent, Chip } from '@mui/material';

// استيراد الصور
import House1 from '@/assets/images/hotals1 (1).png';
import House2 from '@/assets/images/hotals1 (2).png';
import House3 from '@/assets/images/hotals1 (3).png';
import House4 from '@/assets/images/hotals1 (4).png';

const housesData = [
  { id: 1, name: 'Green Park', location: 'Tangerang, Indonesia', image: House1, popular: false },
  { id: 2, name: 'Podo Wae', location: 'Madiun, Indonesia', image: House2, popular: false },
  { id: 3, name: 'Silver Rain', location: 'Bandung, Indonesia', image: House3, popular: false },
  { id: 4, name: 'Cashville', location: 'Kemang, Indonesia', image: House4, popular: true },
];
export default function Hotels() {
  return (
    <>
      <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 4, color: '#152C5B', fontFamily: "'Poppins', sans-serif" }}>
          Hotels with large living room
        </Typography>
  
        <Grid container spacing={3}>
          {housesData.map((house) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={house.id}>
              <Card sx={{ borderRadius: '15px', boxShadow: 'none', position: 'relative', backgroundColor: 'transparent' }}>
                
                {house.popular && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bgcolor: "#FF498B",
                      color: "white",
                      px: 2.5,
                      py: 1,
                      borderBottomLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      zIndex: 3,
                      fontSize: "15px",
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}>Popular</span> 
                    <span style={{ fontWeight: 'normal', fontSize: '13px' }}>Choice</span>
                  </Box>
                )}
  
                <Box sx={{ overflow: 'hidden', borderRadius: '15px', aspectRatio: '4/3', width: '100%', position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={house.image}
                    alt={house.name}
                    sx={{ 
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      transition: 'transform 0.5s ease', 
                      '&:hover': { transform: 'scale(1.08)' } 
                    }}
                  />
                </Box>
                
                <CardContent sx={{ px: 0, pt: 2, pb: "0 !important" }}>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', color: '#152C5B', fontWeight: 600, mb: 0.5 }}>
                    {house.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0B0', fontWeight: 400 }}>
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
