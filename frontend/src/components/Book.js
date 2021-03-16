import React from 'react';

import BookImage from './BookImage';
import { BookText } from './BookText';
// import BookInput from './BookInput';
import Ciccio from './BookInput';

export const Book = () =>
(<div className="col-md-4">
    <BookImage />
    <BookText />
    <Ciccio />
</div>
)
