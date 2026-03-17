function transporMatriz(A) {
    if (!A || A.length === 0) return;

    console.log("Matriz Original:");
    A.forEach(row => console.log(`[ ${row.join(", ")} ]`));

    const rows = A.length;
    const cols = A[0].length;
    const transposedMatrix = [];

    for (let j = 0; j < cols; j++) {
        const newRow = [];
        for (let i = 0; i < rows; i++) {
            newRow.push(A[i][j]);
        }
        transposedMatrix.push(newRow);
    }

    console.log("\nMatriz Transposta:");
    transposedMatrix.forEach(row => console.log(`[ ${row.join(", ")} ]`));
}

const A = [
    [1, 2],
    [3, 4],
    [5, 6]
];

transporMatriz(A);
