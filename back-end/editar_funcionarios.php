<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Headers: *');

include_once 'config.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

$id = $_GET['id'];

if ($dados && $id) {
    $query_funcionario = "UPDATE funcionarios SET nome=:nome, imagem=:imagem, email=:email, telefone=:telefone, cargo=:cargo WHERE id=:id";
    $edit_funcionario = $conn->prepare($query_funcionario);

    $edit_funcionario->bindParam(':nome', $dados['nome'], PDO::PARAM_STR);
    $edit_funcionario->bindParam(':imagem', $dados['imagem'], PDO::PARAM_STR);
    $edit_funcionario->bindParam(':email', $dados['email'], PDO::PARAM_STR);
    $edit_funcionario->bindParam(':telefone', $dados['telefone'], PDO::PARAM_STR);
    $edit_funcionario->bindParam(':cargo', $dados['cargo'], PDO::PARAM_STR);
    $edit_funcionario->bindParam(':id', $id, PDO::PARAM_INT);

    $edit_funcionario->execute();

    if ($edit_funcionario->rowCount()) {
        $response = [
            "erro" => false,
            "messagem" => "Funcionário editado com sucesso!"
        ];
    } else {
        $response = [
            "erro" => false,
            "messagem" => "Funcionário não editado!"
        ];
    }
} else {
    $response = [
        "erro" => false,
        "messagem" => "Funcionário não editado!"
    ];
}

http_response_code(200);
echo json_encode($response);
