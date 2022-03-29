# climate-change-news-live-api

https://climate-change-newslive-api.herokuapp.com/

Api that shows the latest Climate Change News mentioned in different newspapers from around the world.

Available REST Endpoints:

1) Get All Climate Change News:

https://climate-change-newslive-api.herokuapp.com/news

This endpoint will return back all Climate Change News from several newspapers from around the world.

2) Get Individual News Source Climate Change News:

https://climate-change-newslive-api.herokuapp.com/{newspaperId}

This endpoint will return back news about Climate Change from a specific newspaper.

Replace {newspaperId} with one of the following options:
        
        The Times (UK)
        newspaperId: 'times'
        
        The Guardian (UK)
        newspaperId: 'guardian'
        
        Telegraph (UK)
        newspaperId: 'telegraph'
        
        The New York Times (USA)
        newspaperId: 'nytimes'
        
        The Wall Street Journal (USA)
        newspaperId: 'wsjournal'
        
        The Washington Post (USA)
        newspaperId: 'washingtonpost'
       
        The Independent (UK)
        newspaperId: 'independent'
        
        The Times of India
        newspaperId: 'timesofindia',
       
        The Sidney Morning Herald (Australia)
        newspaperId: 'sydneymorningherald',
        
        Daily Mail (UK)
        newspaperId: 'dailymail'
        
  
