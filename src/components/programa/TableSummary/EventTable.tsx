import styles from "./TableSummary.module.css";

type TableCell = {
    content: React.ReactNode;
    colSpan?: number;
    rowSpan?: number;
    isHeader?: boolean;
}

type EventTableProps = {
    headers: string[],
    rows: TableCell[][];
}

const EventTable: React.FC<EventTableProps> = ({ headers, rows }) => {
    return (
        <table className={styles.agendatable}>
            <thead>
            <tr>
                {headers.map((header, i) => (
                    <th key={i}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {rows.map((row, i) => (
                <tr key={i}>
                    {row.map((cell, j) => {
                        const { content, colSpan, rowSpan, isHeader } = cell;
                        const Tag = isHeader ? 'th' : 'td';
                        return (
                            <Tag key={j} colSpan={colSpan} rowSpan={rowSpan}>
                                {content}
                            </Tag>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default EventTable;
