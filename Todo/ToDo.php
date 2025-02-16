<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Post data raw and decode JSON
    $data = file_get_contents("php://input");
    $input = json_decode($data, true);
    $file = 'tasks.json';

    $tasks = [];
    if (file_exists($file)) {
        $data = file_get_contents($file);
        $tasks = json_decode($data, true);
    }

    if (isset($input['add'])) {
        $taskData = $input['add'];
        $tasks[] = $taskData;
        function my_sort($a, $b) {
            if ($a["importance"] == $b["importance"]) return 0;
            return ($a["importance"] > $b["importance"]) ? -1 : 1;
          }
        usort($tasks, "my_sort");
        //Save updated data back to file
        file_put_contents($file, json_encode($tasks, JSON_PRETTY_PRINT));
        //Returns data
        echo json_encode([
            'tasks' => $tasks,
            'message' => 'Task added.']);
    } elseif (isset($input['remove'])) {
        foreach ($input['remove'] as $index) {
            unset($tasks[$index]);
        }
        //Rearange file
        $tasks = array_values($tasks);
        file_put_contents($file, json_encode($tasks, JSON_PRETTY_PRINT));
        echo json_encode([
            'tasks' => $tasks,
            'message' => 'Task removed.']);
    }
} elseif($_SERVER['REQUEST_METHOD'] === 'GET'){
    $file = 'tasks.json';
    $tasks = [];
    function my_sort($a, $b) {
        if ($a["importance"] == $b["importance"]) return 0;
        return ($a["importance"] > $b["importance"]) ? -1 : 1;
      }
    usort($tasks, "my_sort");
    if (file_exists($file)) {
        $data = file_get_contents($file);
        $tasks = json_decode($data, true);
    }
        echo json_encode([
            'tasks' => $tasks,
            'message' => 'All tasks fetched']);
}
?>
