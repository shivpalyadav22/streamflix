export interface Movie {
  id: string
  title: string
  year: number
  genre: string[]
  rating: number
  duration: string
  description: string
  poster: string
  backdrop: string
  trailer?: string
  videoUrl?: string // Added videoUrl property
  featured?: boolean
}

export const moviesData: Movie[] = [
  {
    id: "1",
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    duration: "2h 32m",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911JEiVudGR4TB8.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/dqK9Hag1054hbJdfHWXLBpmqi1c.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    featured: true,
  },
  {
    id: "2",
    title: "Inception",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    rating: 8.8,
    duration: "2h 28m",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://image.tmdb.org/t/p/w500/oYuEqgUeJgY0r0b10z100000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7vMhVf7LM0000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    featured: true,
  },
  {
    id: "3",
    title: "Pulp Fiction",
    year: 1994,
    genre: ["Crime", "Drama"],
    rating: 8.9,
    duration: "2h 34m",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszBPY82WPjC9000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/suaEOtk1PvjPzM000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    featured: true,
  },
  {
    id: "4",
    title: "The Shawshank Redemption",
    year: 1994,
    genre: ["Drama"],
    rating: 9.3,
    duration: "2h 22m",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: "https://image.tmdb.org/t/p/w500/q6y0WtJ000000000000000000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/kXfqcdQo000000000000000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    featured: true,
  },
  {
    id: "5",
    title: "Forrest Gump",
    year: 1994,
    genre: ["Drama", "Romance"],
    rating: 8.8,
    duration: "2h 22m",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.",
    poster: "https://image.tmdb.org/t/p/w500/arw2Fux000000000000000000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/yE5d30000000000000000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: "6",
    title: "The Matrix",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    rating: 8.7,
    duration: "2h 16m",
    description:
      "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr000000000000000000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/f89U3ADr000000000000000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: "7",
    title: "Goodfellas",
    year: 1990,
    genre: ["Biography", "Crime", "Drama"],
    rating: 8.7,
    duration: "2h 26m",
    description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
    poster: "https://image.tmdb.org/t/p/w500/rCzp00000000000000000000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/mte000000000000000000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
  {
    id: "8",
    title: "The Godfather",
    year: 1972,
    genre: ["Crime", "Drama"],
    rating: 9.2,
    duration: "2h 55m",
    description:
      "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsPXs00000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/rSPw70000000000000000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
  {
    id: "9",
    title: "Interstellar",
    year: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.6,
    duration: "2h 49m",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://image.tmdb.org/t/p/w500/gEU2Qni000000000000000000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/xJHUKr000000000000000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  },
  {
    id: "10",
    title: "Fight Club",
    year: 1999,
    genre: ["Drama"],
    rating: 8.8,
    duration: "2h 19m",
    description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into an anarchist organization.",
    poster: "https://image.tmdb.org/t/p/w500/a2o000000000000000000000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/8uO000000000000000000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
  {
    id: "11",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    genre: ["Adventure", "Drama", "Fantasy"],
    rating: 8.8,
    duration: "2h 58m",
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    poster: "https://image.tmdb.org/t/p/w500/6oom00000000000000000000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/u00000000000000000000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  },
  {
    id: "12",
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    genre: ["Adventure", "Fantasy", "Sci-Fi"],
    rating: 8.6,
    duration: "2h 1m",
    description:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station.",
    poster: "https://image.tmdb.org/t/p/w500/6FfCt00000000000000000000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/200000000000000000000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
  },
]

export const tvShowsData: Movie[] = [
  {
    id: "tv1",
    title: "Breaking Bad",
    year: 2008,
    genre: ["Crime", "Drama", "Thriller"],
    rating: 9.5,
    duration: "5 Seasons",
    description:
      "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    poster: "https://image.tmdb.org/t/p/w500/gg0000000000000000000000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/tsRy60000000000000000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    featured: true,
  },
  {
    id: "tv2",
    title: "Game of Thrones",
    year: 2011,
    genre: ["Action", "Adventure", "Drama"],
    rating: 9.3,
    duration: "8 Seasons",
    description:
      "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    poster: "https://image.tmdb.org/t/p/w500/u3bZ00000000000000000000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/su0000000000000000000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    featured: true,
  },
  {
    id: "tv3",
    title: "Stranger Things",
    year: 2016,
    genre: ["Drama", "Fantasy", "Horror"],
    rating: 8.7,
    duration: "4 Seasons",
    description:
      "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    poster: "https://image.tmdb.org/t/p/w500/490000000000000000000000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/560000000000000000000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    featured: true,
  },
  {
    id: "tv4",
    title: "The Office",
    year: 2005,
    genre: ["Comedy"],
    rating: 8.9,
    duration: "9 Seasons",
    description:
      "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
    poster: "https://image.tmdb.org/t/p/w500/qWnJ00000000000000000000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/000000000000000000000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: "tv5",
    title: "Friends",
    year: 1994,
    genre: ["Comedy", "Romance"],
    rating: 8.9,
    duration: "10 Seasons",
    description:
      "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.",
    poster: "https://image.tmdb.org/t/p/w500/f49000000000000000000000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/r90000000000000000000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: "tv6",
    title: "The Crown",
    year: 2016,
    genre: ["Biography", "Drama", "History"],
    rating: 8.7,
    duration: "6 Seasons",
    description:
      "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    poster: "https://image.tmdb.org/t/p/w500/s00000000000000000000000000.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/j00000000000000000000000000.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
]
