interface Props {
    data: any;
};

export const Categories = ({data}:Props) => {
    return (
        <div>
         Categories :{JSON.stringify(data, null, 2)}
        </div>
    )
};