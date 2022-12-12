# Lelang-BackEnd
<b>Table Relationship</b>:

![Screenshot (33)](https://user-images.githubusercontent.com/100252923/207083060-988ed3f9-254c-4a4f-b64c-1d1fbe2c7f59.png)

<b>Link Download File Database</b>: <br>
https://drive.google.com/file/d/15Ly-va5DkHPPbubJvx9IwCEXUe7yTxkQ/view?usp=sharing <br>

---------------------------------------------------------

<b>Dokumentasi API</b>:

API BARANG <br>
Auth for admin & petugas <br>
GET ALL : http://localhost:8080/barang <br>
GET FIND BY ID : http://localhost:8080/barang/{id_barang} <br>
POST : http://localhost:8080/barang <br>
PUT : http://localhost:8080/barang/{id_barang} <br>
DELETE : http://localhost:8080/barang/{id_barang} <br>

---------------------------------------------------------

API MASYARAKAT <br>
Auth for admin, petugas, masyarakat (all) <br>
GET ALL : http://localhost:8080/masyarakat <br>
GET FIND BY ID : http://localhost:8080/masyarakat/{id_masyarakat} <br>
POST (REGISTER) : http://localhost:8080/masyarakat <br>
PUT : http://localhost:8080/masyarakat/{id_masyarakat} <br>
DELETE : http://localhost:8080/masyarakat/{id_masyarakat} <br>

---------------------------------------------------------

API PETUGAS <br>
Auth for admin & petugas <br>
GET ALL : http://localhost:8080/petugas <br>
GET FIND BY ID : http://localhost:8080/petugas/{id_petugas} <br>
POST (REGISTER) : http://localhost:8080/petugas <br>
PUT : http://localhost:8080/petugas/{id_petugas} <br>
DELETE : http://localhost:8080/petugas/{id_petugas} <br>

---------------------------------------------------------

API LELANG <br>
Auth for admin, petugas, masyarakat (all) <br>
GET ALL : http://localhost:8080/lelang <br>
GET FIND BY ID : http://localhost:8080/lelang/{id_lelang} <br>
GET FIND BY ID BARANG : http://localhost:8080/lelang/barang/{id_barang} <br>
GET FIND BY ID MASYARAKAT : http://localhost:8080/lelang/masyarakat/{id_masyarakat} <br>
GET FIND BY ID PETUGAS : http://localhost:8080/lelang/petugas/{id_petugas} <br>
POST : http://localhost:8080/lelang (only for admin & petugas) <br>
PUT : http://localhost:8080/lelang/{id_lelang} (only for admin & petugas) <br>
DELETE : http://localhost:8080/lelang/{id_lelang} (only for admin & petugas) <br>
POST BID : http://localhost:8080/lelang/bid (only for masyarakat) <br>

---------------------------------------------------------

API HISTORY <br>
Auth for admin, petugas, masyarakat (all) <br>
GET ALL : http://localhost:8080/history <br>
GET FIND BY ID : http://localhost:8080/history/{id_history} <br>
GET FIND BY ID MASYARAKAT : http://localhost:8080/history/masyarakat/{id_masyarakat} <br>
DELETE : http://localhost:8080/history/{id_history} <br>

---------------------------------------------------------

API LOGIN <br>
POST : http://localhost:8080/login <br>
