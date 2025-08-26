// src/pages/BorrowBookPage.tsx
import { useParams } from 'react-router-dom';
import BorrowBook from '../components/BorrowBook';

const BorrowBookPage = () => {
    const { bookId } = useParams<{ bookId: string }>();

    if (!bookId) {
        return <div>Invalid book ID</div>;
    }

    return (
        <div>
            <BorrowBook bookId={bookId} />
        </div>
    );
};

export default BorrowBookPage;