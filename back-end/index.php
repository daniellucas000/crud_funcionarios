<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header('Content-Type: application/json; charset=UTF-8');

include_once 'config.php';

$query_funcionarios = "SELECT id, nome, imagem, email, telefone, cargo  FROM funcionarios ORDER BY id DESC";
$result_funcionarios = $conn->prepare($query_funcionarios);
$result_funcionarios->execute();

if (($result_funcionarios) and ($result_funcionarios->rowCount() != 0)) {
    while ($row_funcionario = $result_funcionarios->fetch(PDO::FETCH_ASSOC)) {
        extract($row_funcionario);

        $lista_funcionarios['records'][$id] = [
            'id' => $id,
            'nome' => $nome,
            'imagem' => $imagem,
            'email' => $email,
            'telefone' => $telefone,
            'cargo' => $cargo
        ];
    }
    http_response_code(200);
    echo json_encode($lista_funcionarios);
}
