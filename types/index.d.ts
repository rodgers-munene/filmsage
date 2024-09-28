import { title } from "process";

declare type SignUpParams = {
    firstname: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    password: string;
};

declare type LoginUser = {
    email: string;
    password: string;
};

declare type Movie = {
    id: number;
    title: string;
    overview: string;
    releaseDate: string;
    genres: string;
    voteCount: number;
};

declare type User = {
    $id: string;
    email: string;
    userId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    watchList: Movie[];
    watchedMovies: Movie[];
};

declare interface navBarProps{
    firstName: string;
}
declare interface sideBarProps{
    firstName: string;
}