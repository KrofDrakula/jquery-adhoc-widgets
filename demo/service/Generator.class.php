<?php 

class Generator {
	public $firstNames = array(
		"Alice", "Bob", "Charlie", "Denise", "Eugene",
		"Frank", "George", "Halley", "Ian", "Jenny",
		"Keith", "Leonard", "Michelle", "Nathan", "Olivia",
		"Patrick", "Quince", "Rachel", "Stephen", "Tammy",
		"Ulysees", "Veronica", "William", "Xavier", "Yuri",
		"Zachary"
	);
	
	public $lastNames = array(
		"Aaronsson", "Barisson", "Carensson", "Derrickson", "Eiffelsson",
		"Fridrickson", "Gerdsson", "Henriksson", "Isson", "Johansson",
		"Karlsson", "Leronsson", "Michalsson", "Nericksson", "Olafsson",
		"Pertisson", "Quacksson", "Raylesson", "Stephensson", "Tammsson",
		"Ulicksson", "Vansson", "Warrensson", "Xalensson", "Yurikssen",
		"Zarickssen"
	);
	
	public function getRandomName() {
		return $this->firstNames[rand(0, count($this->firstNames) - 1)] . ' ' . $this->lastNames[rand(0, count($this->lastNames) - 1)]; 
	}
	
	public function getRandomNames($n = 10) {
		$ret = array();
		for($i = 0; $i < $n; $i++) array_push($ret, $this->getRandomName());
	}
}