import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  CircularProgress,
  Fade
} from '@mui/material';
import {
  Person,
  Email,
  CalendarToday,
  TrendingUp,
  Event as EventIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { eventService } from '../services';
import { formatDate } from '../utils/constants';

const Profile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    pastEvents: 0,
    totalAttendees: 0
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      setLoading(true);
      const response = await eventService.getEvents();
      const events = response.events || [];
      
      const now = new Date();
      const upcoming = events.filter(event => new Date(event.date) > now);
      const past = events.filter(event => new Date(event.date) <= now);
      const totalAttendees = events.reduce((sum, event) => sum + (event.confirmedCount || 0), 0);

      setStats({
        totalEvents: events.length,
        upcomingEvents: upcoming.length,
        pastEvents: past.length,
        totalAttendees
      });

      // Get 3 most recent events
      const sortedEvents = events
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      setRecentEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '90vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={800}>
          <Paper
            elevation={24}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
            }}
          >
            {/* Profile Header */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                p: 6,
                textAlign: 'center'
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 3,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  fontSize: '3rem',
                  fontWeight: 'bold'
                }}
              >
                {user?.name?.charAt(0).toUpperCase() || <Person sx={{ fontSize: '3rem' }} />}
              </Avatar>
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                {user?.name || 'User'}
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                <Email sx={{ fontSize: 20 }} />
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {user?.email}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mt: 2, opacity: 0.8 }}>
                Event Organizer
              </Typography>
            </Box>

            {/* Stats Section */}
            <Box p={6}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  mb: 4,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Your Event Statistics
              </Typography>

              <Grid container spacing={4} sx={{ mb: 6 }}>
                <Grid item xs={6} md={3}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      height: '100%'
                    }}
                  >
                    <EventIcon sx={{ fontSize: 40, mb: 2 }} />
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                      {stats.totalEvents}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Events
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={6} md={3}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      color: 'white',
                      height: '100%'
                    }}
                  >
                    <CalendarToday sx={{ fontSize: 40, mb: 2 }} />
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                      {stats.upcomingEvents}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Upcoming Events
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={6} md={3}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      color: 'white',
                      height: '100%'
                    }}
                  >
                    <TrendingUp sx={{ fontSize: 40, mb: 2 }} />
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                      {stats.pastEvents}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Completed Events
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={6} md={3}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                      color: 'white',
                      height: '100%'
                    }}
                  >
                    <Person sx={{ fontSize: 40, mb: 2 }} />
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                      {stats.totalAttendees}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Attendees
                    </Typography>
                  </Card>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              {/* Recent Events */}
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Recent Events
              </Typography>

              {recentEvents.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <Typography variant="body1" color="text.secondary">
                    No events created yet. Start by creating your first event!
                  </Typography>
                  <Button
                    variant="contained"
                    href="/events/new"
                    sx={{
                      mt: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      }
                    }}
                  >
                    Create First Event
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {recentEvents.map((event) => (
                    <Grid item xs={12} md={4} key={event._id}>
                      <Card
                        sx={{
                          height: '100%',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 15px 40px rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" component="h4" gutterBottom>
                            {event.title}
                          </Typography>
                          <Chip
                            label={event.type}
                            size="small"
                            sx={{
                              mb: 2,
                              bgcolor: '#667eea',
                              color: 'white'
                            }}
                          />
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {formatDate(event.date)}
                          </Typography>
                          {event.location && (
                            <Typography variant="body2" color="text.secondary">
                              📍 {event.location}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              <Box textAlign="center" mt={4}>
                <Button
                  variant="outlined"
                  href="/events"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderColor: '#667eea',
                    color: '#667eea',
                    '&:hover': {
                      borderColor: '#667eea',
                      backgroundColor: 'rgba(102, 126, 234, 0.1)'
                    }
                  }}
                >
                  View All Events
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Profile;
