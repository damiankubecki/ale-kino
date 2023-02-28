import { IMovie } from '@app/shared/types/interfaces';
import { BehaviorSubject, Observable, of, skip } from 'rxjs';

describe('MoviesService', () => {
  const moviesCollectionMock$$ = new BehaviorSubject<IMovie[]>([
    {
      id: 1,
      title: 'Apokawixa',
      isPremiere: true,
      description: {
        short:
          'Lorem ipsum dolor, sit amet consectetur adipisicing ciatis ratione, nesciunt at labore nostrum possimus eos recusandae, quisquam unde, alias sint cum ipsam consequuntur deleniti magnam sit? Atque dolorum minus ullam quo numquam? Saepe aut at asperiores.',
        long: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis hic porro facere enim incidunt saepe iste quo laboriosam accusantium, quam temporibus consequuntur natus et rem similique impedit perspiciatis labore cumque cum, voluptates in harum? Autem neque unde reiciendis ratione delectus odio, fugit debitis, rem quasi blanditiis veritatis? Vitae, eius praesentium.',
      },
      duration: 120,
      minAge: 13,
      genres: ['Horror'],
      imageURL:
        'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSrIBRbDsn0IVu-O91QK94ChYiO0UXW_RJyTb2GooRrQvdLUPCD',
    },
    {
      id: 2,
      title: 'Co w duszy gra',
      isPremiere: false,
      description: {
        short:
          'Lorem ipsum dolor, alias sint cum ipsam consequuntur deleniti magnam sit? Atque dolorum minus ullam quo numquam? Saepe aut at asperiores.',
        long: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis hic porro facere enim incidunt saepe iste quo laboriosam accusantium, quam temporibus consequuntur natus et rem similique impedit perspiciatis labore cumque cum, voluptates in harum? Autem neque unde reiciendis ratione delectus odio, fugit debitis, rem quasi blanditiis veritatis? Vitae, eius praesentium.',
      },
      duration: 120,
      minAge: null,
      genres: ['Animowany', 'Obyczajowy'],
      imageURL: null,
    },
  ]);

  const getMovieByIdMock = (id: number) => {
    return moviesCollectionMock$$.value.find(movie => movie.id == id);
  };

  it('getting movie by id', () => {
    const movie = getMovieByIdMock(1);

    expect(movie?.title).toBeTruthy();
  });
});
