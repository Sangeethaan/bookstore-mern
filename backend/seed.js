const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');

dotenv.config();

const books = [
    // Original 10 (Updated with INR prices)
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 399,
        stockQuantity: 15,
        genre: 'Classic',
        description: 'A novel set in the Roaring Twenties.',
        imageUrl: 'https://m.media-amazon.com/images/I/61uYYec8joL._SY522_.jpg'
    },
    {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        price: 2800,
        stockQuantity: 20,
        genre: 'Technology',
        description: 'A Handbook of Agile Software Craftsmanship.',
        imageUrl: 'https://m.media-amazon.com/images/I/71nj3JM-igL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: '1984',
        author: 'George Orwell',
        price: 299,
        stockQuantity: 30,
        genre: 'Dystopian',
        description: 'A social science fiction novel and cautionary tale.',
        imageUrl: 'https://m.media-amazon.com/images/I/71wANojhEKL._AC_UL480_FMwebp_QL65_.jpg'
    },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        price: 350,
        stockQuantity: 12,
        genre: 'Classic',
        description: 'A novel about racial injustice in the Deep South.',
        imageUrl: 'https://m.media-amazon.com/images/I/81aY1lxk+9L._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt & David Thomas',
        price: 3200,
        stockQuantity: 8,
        genre: 'Technology',
        description: 'Your journey to mastery.',
        imageUrl: 'https://m.media-amazon.com/images/I/911WvX7M98L._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        price: 499,
        stockQuantity: 25,
        genre: 'Fantasy',
        description: 'A fantasy novel and children\'s book.',
        imageUrl: 'https://m.media-amazon.com/images/I/81TZj+3ecWL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        price: 599,
        stockQuantity: 50,
        genre: 'Fantasy',
        description: 'The first novel in the Harry Potter series.',
        imageUrl: 'https://m.media-amazon.com/images/I/A1jGvzIZ7ZL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        price: 399,
        stockQuantity: 18,
        genre: 'Classic',
        description: 'A story about teenage angst and alienation.',
        imageUrl: 'https://m.media-amazon.com/images/I/81TRBjfC5fL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Design Patterns',
        author: 'Erich Gamma et al.',
        price: 3500,
        stockQuantity: 5,
        genre: 'Technology',
        description: 'Elements of Reusable Object-Oriented Software.',
        imageUrl: 'https://m.media-amazon.com/images/I/51nL96Abi1L._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        price: 199,
        stockQuantity: 22,
        genre: 'Romance',
        description: 'A romantic novel of manners.',
        imageUrl: 'https://m.media-amazon.com/images/I/71FAEjxrgjL._AC_UL480_FMwebp_QL65_.jpg'
    },

    // 20 New Books
    {
        title: 'Dune',
        author: 'Frank Herbert',
        price: 599,
        stockQuantity: 40,
        genre: 'Sci-Fi',
        description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides.',
        imageUrl: 'https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'The Martian',
        author: 'Andy Weir',
        price: 450,
        stockQuantity: 35,
        genre: 'Sci-Fi',
        description: 'Six days ago, astronaut Mark Watney became one of the first people to walk on Mars.',
        imageUrl: 'https://m.media-amazon.com/images/I/81pcgLoQw1L._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Steve Jobs',
        author: 'Walter Isaacson',
        price: 899,
        stockQuantity: 20,
        genre: 'Biography',
        description: 'The exclusive biography of Steve Jobs.',
        imageUrl: 'https://m.media-amazon.com/images/I/81VStYnDGrL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Becoming',
        author: 'Michelle Obama',
        price: 799,
        stockQuantity: 60,
        genre: 'Biography',
        description: 'In a life filled with meaning and accomplishment, Michelle Obama has emerged as one of the most iconic and compelling women of our era.',
        imageUrl: 'https://m.media-amazon.com/images/I/81h2gWPTYJL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'The Da Vinci Code',
        author: 'Dan Brown',
        price: 399,
        stockQuantity: 50,
        genre: 'Mystery',
        description: 'While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night.',
        imageUrl: 'https://m.media-amazon.com/images/I/71QST3bEo8L._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        price: 599,
        stockQuantity: 30,
        genre: 'History',
        description: 'A brief history of humankind.',
        imageUrl: 'https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Atomic Habits',
        author: 'James Clear',
        price: 650,
        stockQuantity: 100,
        genre: 'Self-Help',
        description: 'An easy & proven way to build good habits & break bad ones.',
        imageUrl: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        price: 299,
        stockQuantity: 45,
        genre: 'Fiction',
        description: 'A fable about following your dream.',
        imageUrl: 'https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'The Kite Runner',
        author: 'Khaled Hosseini',
        price: 399,
        stockQuantity: 25,
        genre: 'Fiction',
        description: 'The unforgettable, heartbreaking story of the unlikely friendship between a wealthy boy and the son of his father’s servant.',
        imageUrl: 'https://m.media-amazon.com/images/I/81QSukPYvML._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'A Game of Thrones',
        author: 'George R. R. Martin',
        price: 599,
        stockQuantity: 40,
        genre: 'Fantasy',
        description: 'The first book in the A Song of Ice and Fire series.',
        imageUrl: 'https://m.media-amazon.com/images/I/91dSMhdIzTL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        price: 799,
        stockQuantity: 30,
        genre: 'Sci-Fi',
        description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission.',
        imageUrl: 'https://m.media-amazon.com/images/I/81wvR09gLRL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Guns, Germs, and Steel',
        author: 'Jared Diamond',
        price: 699,
        stockQuantity: 15,
        genre: 'History',
        description: 'The Fates of Human Societies.',
        imageUrl: 'https://m.media-amazon.com/images/I/91GzlpEscXL._SX385_.jpg'
    },
    {
        title: 'Gone Girl',
        author: 'Gillian Flynn',
        price: 350,
        stockQuantity: 28,
        genre: 'Mystery',
        description: 'Marriage can be a real killer.',
        imageUrl: 'https://m.media-amazon.com/images/I/71XPY7U9OML._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'The Girl with the Dragon Tattoo',
        author: 'Stieg Larsson',
        price: 299,
        stockQuantity: 20,
        genre: 'Mystery',
        description: 'Murder mystery, family saga, love story, and financial intrigue.',
        imageUrl: 'https://m.media-amazon.com/images/I/71jy1t1N57L._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        price: 499,
        stockQuantity: 35,
        genre: 'Psychology',
        description: 'The major New York Times bestseller by the winner of the Nobel Prize in Economics.',
        imageUrl: 'https://m.media-amazon.com/images/I/41wI53OEpCL._SY445_SX342_FMwebp_.jpg'
    },
    {
        title: 'Life of Pi',
        author: 'Yann Martel',
        price: 350,
        stockQuantity: 22,
        genre: 'Fiction',
        description: 'A fantasy adventure novel.',
        imageUrl: 'https://m.media-amazon.com/images/I/81mVXLKAeBL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'The Road',
        author: 'Cormac McCarthy',
        price: 320,
        stockQuantity: 18,
        genre: 'Fiction',
        description: 'A post-apocalyptic novel.',
        imageUrl: 'https://m.media-amazon.com/images/I/51M7XGLQTBL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'The Name of the Wind',
        author: 'Patrick Rothfuss',
        price: 550,
        stockQuantity: 28,
        genre: 'Fantasy',
        description: 'The Kingkiller Chronicle: Day One.',
        imageUrl: 'https://m.media-amazon.com/images/I/91OqU1cAmrL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        price: 399,
        stockQuantity: 42,
        genre: 'Mystery',
        description: 'The Silent Patient is a shocking psychological thriller.',
        imageUrl: 'https://m.media-amazon.com/images/I/81JJPDNlxSL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Educated',
        author: 'Tara Westover',
        price: 799,
        stockQuantity: 19,
        genre: 'Biography',
        description: 'A Memoir.',
        imageUrl: 'https://m.media-amazon.com/images/I/81WojUxbbFL._AC_UY327_FMwebp_QL65_.jpg'
    },
    // Adding 10 more to make 30 total
    {
        title: 'Rich Dad Poor Dad',
        author: 'Robert T. Kiyosaki',
        price: 399,
        stockQuantity: 60,
        genre: 'Finance',
        description: 'What the Rich Teach Their Kids About Money.',
        imageUrl: 'https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Ikigai',
        author: 'Hector Garcia',
        price: 350,
        stockQuantity: 55,
        genre: 'Self-Help',
        description: 'The Japanese Secret to a Long and Happy Life.',
        imageUrl: 'https://m.media-amazon.com/images/I/81l3rZK4lnL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        price: 399,
        stockQuantity: 45,
        genre: 'Finance',
        description: 'Timeless lessons on wealth, greed, and happiness.',
        imageUrl: 'https://m.media-amazon.com/images/I/81gC3mdNi5L._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
        price: 699,
        stockQuantity: 50,
        genre: 'Fantasy',
        description: 'The second novel in the Harry Potter series.',
        imageUrl: 'https://m.media-amazon.com/images/I/81Imqz-41vL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Harry Potter and the Prisoner of Azkaban',
        author: 'J.K. Rowling',
        price: 699,
        stockQuantity: 45,
        genre: 'Fantasy',
        description: 'The third novel in the Harry Potter series.',
        imageUrl: 'https://m.media-amazon.com/images/I/71NaVwWsRDL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Deep Work',
        author: 'Cal Newport',
        price: 499,
        stockQuantity: 20,
        genre: 'Self-Help',
        description: 'Rules for Focused Success in a Distracted World.',
        imageUrl: 'https://m.media-amazon.com/images/I/91nujEwIpYL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Zero to One',
        author: 'Peter Thiel',
        price: 550,
        stockQuantity: 25,
        genre: 'Business',
        description: 'Notes on Startups, or How to Build the Future.',
        imageUrl: 'https://m.media-amazon.com/images/I/71uAI28kJuL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'The Lean Startup',
        author: 'Eric Ries',
        price: 650,
        stockQuantity: 30,
        genre: 'Business',
        description: 'How Today\'s Entrepreneurs Use Continuous Innovation.',
        imageUrl: 'https://m.media-amazon.com/images/I/71mhBrysFaL._AC_UY327_FMwebp_QL65_.jpg'
    },
    {
        title: 'Wings of Fire',
        author: 'A.P.J. Abdul Kalam',
        price: 399,
        stockQuantity: 100,
        genre: 'Biography',
        description: 'An Autobiography of APJ Abdul Kalam.',
        imageUrl: 'https://m.media-amazon.com/images/I/91IAaf98qqL._AC_UL480_FMwebp_QL65_.jpg'
    },
    {
        title: 'Train to Pakistan',
        author: 'Khushwant Singh',
        price: 250,
        stockQuantity: 40,
        genre: 'History',
        description: 'A historical novel about the Partition of India.',
        imageUrl: 'https://m.media-amazon.com/images/I/51V2HYeESRL._AC_UY327_FMwebp_QL65_.jpg'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        try {
            await Book.collection.drop();
            console.log('Existing collection and indexes dropped');
        } catch (error) {
            console.log('Collection did not exist or could not be dropped, proceeding...');
        }

        await Book.insertMany(books);
        console.log('Database populated with 30 localized books!');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedDB();
