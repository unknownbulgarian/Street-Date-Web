import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Pagination.module.css'
import TextIcon from "../TextIcon/TextIcon";


import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";
import { SiPowerpages } from "react-icons/si";
import { MdSkipNext } from "react-icons/md";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: Dispatch<SetStateAction<number>>;
    publicId?: string | undefined;
    routing: string;
}

export default function Pagination({ currentPage, totalPages, onPageChange, publicId, routing }: PaginationProps) {

    const navigate = useNavigate();
    

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        navigate(routing);
    };

    const generatePageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 7;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, currentPage + 2);

            if (currentPage <= 3) {
                startPage = 1;
                endPage = maxPagesToShow - 2;
            } else if (currentPage >= totalPages - 2) {
                startPage = totalPages - (maxPagesToShow - 3);
                endPage = totalPages;
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (startPage > 2) pageNumbers.unshift('...');
            if (startPage > 1) pageNumbers.unshift(1);

            if (endPage < totalPages - 1) pageNumbers.push('...');
            if (endPage < totalPages) pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className={styles.pagination}>
            <TextIcon
                title='Erste'
                color="white"
                fontSize="0.9rem"
                iconFontSize="1.1rem"
                backgroundColor="rgba(152, 78, 248, 0.568)"
                boxShadow="5px 5px 10px rgba(0, 0, 0, 0.5)"
                borderRadius="0.3em"
                width="80px"
                height="25px"
                onClick={() => { currentPage === 1 ? '' : handlePageChange(1) }}
                onHover={(e) => {e.currentTarget.style.backgroundColor = 'rgba(152, 78, 248, 0.9)'}}
                onUnHover={(e) => {e.currentTarget.style.backgroundColor = 'rgba(152, 78, 248, 0.568)'}}
            >
                <MdFirstPage />
            </TextIcon>
            <TextIcon
                title='Vorherige'
                color="white"
                fontSize="0.9rem"
                iconFontSize="1.1rem"
                backgroundColor="rgba(152, 78, 248, 0.568)"
                boxShadow="5px 5px 10px rgba(0, 0, 0, 0.5)"
                borderRadius="0.3em"
                width="100px"
                height="25px"
                onClick={() => { currentPage === 1 ? '' : handlePageChange(currentPage - 1) }}
                onHover={(e) => {e.currentTarget.style.backgroundColor = 'rgba(152, 78, 248, 0.9)'}}
                onUnHover={(e) => {e.currentTarget.style.backgroundColor = 'rgba(152, 78, 248, 0.568)'}}
            >
                <IoIosReturnLeft />
            </TextIcon>
            {generatePageNumbers().map((page, index) => (
                typeof page === 'string' ? (
                    <span key={index} className="pagination-ellipsis">{page}</span>
                ) : (
                    <TextIcon
                        title={page}
                        color="white"
                        fontSize="0.9rem"
                        iconFontSize="1.1rem"
                        backgroundColor={currentPage === page ? 'rgba(152, 78, 248, 1)' : 'rgba(152, 78, 248, 0.568)'}
                        boxShadow="5px 5px 10px rgba(0, 0, 0, 0.5)"
                        borderRadius="0.3em"
                        paddingLeft="0.5em"
                        paddingRight="0.5em"
                        width="unset"
                        height="25px"
                        key={index}
                        onClick={() => handlePageChange(page as number)}
                    >
                        <SiPowerpages />
                    </TextIcon>
                )
            ))}
            <TextIcon
                title='Weiter'
                color="white"
                fontSize="0.9rem"
                iconFontSize="1.1rem"
                backgroundColor="rgba(152, 78, 248, 0.568)"
                boxShadow="5px 5px 10px rgba(0, 0, 0, 0.5)"
                borderRadius="0.3em"
                width="100px"
                height="25px"
                onClick={() => {currentPage === totalPages ? '' : handlePageChange(currentPage + 1)}}
                onHover={(e) => {e.currentTarget.style.backgroundColor = 'rgba(152, 78, 248, 0.9)'}}
                onUnHover={(e) => {e.currentTarget.style.backgroundColor = 'rgba(152, 78, 248, 0.568)'}}
            >
                <MdSkipNext />
            </TextIcon>
            <TextIcon
                title='Letzte'
                color="white"
                fontSize="0.9rem"
                iconFontSize="1.1rem"
                backgroundColor="rgba(152, 78, 248, 0.568)"
                boxShadow="5px 5px 10px rgba(0, 0, 0, 0.5)"
                borderRadius="0.3em"
                width="80px"
                height="25px"
                onClick={() => { currentPage === totalPages ? '' : handlePageChange(totalPages) }}
                onHover={(e) => {e.currentTarget.style.backgroundColor = 'rgba(152, 78, 248, 0.9)'}}
                onUnHover={(e) => {e.currentTarget.style.backgroundColor = 'rgba(152, 78, 248, 0.568)'}}
            >
                <MdLastPage />
            </TextIcon>
        </div>
    );
}
