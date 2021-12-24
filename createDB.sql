--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.24
-- Dumped by pg_dump version 9.6.24

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: BanThang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BanThang" (
    "MaBT" character(5) NOT NULL,
    "MaCT" character(5),
    "MaTD" character(5),
    "TGianGhiBan" time(6) without time zone
);


ALTER TABLE public."BanThang" OWNER TO postgres;

--
-- Name: BangDau; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BangDau" (
    "MaBD" character(5) NOT NULL,
    "TenBD" character varying(30)
);


ALTER TABLE public."BangDau" OWNER TO postgres;

--
-- Name: CauThu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CauThu" (
    "MaCT" character(5) NOT NULL,
    "TenCT" character varying(50),
    "MaDB" character(5),
    "SoAoCT" integer,
    "ViTri" character varying(30),
    "NgSinhCT" date,
    "ChieuCaoCT" double precision,
    "CanNangCT" double precision,
    "TongBT" integer,
    "AnhCT" character varying(50)
);


ALTER TABLE public."CauThu" OWNER TO postgres;

--
-- Name: ChiTietTD; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ChiTietTD" (
    "MaTD" character(5) NOT NULL,
    "TGian" time(6) without time zone NOT NULL,
    "TheVang" character(5),
    "TheDo" character(5),
    "CauThuRa" character(5),
    "CauThuVao" character(5),
    "GhiChu" character varying(50),
    "Video" character varying(50)
);


ALTER TABLE public."ChiTietTD" OWNER TO postgres;

--
-- Name: DoiBong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DoiBong" (
    "MaDB" character(5) NOT NULL,
    "TenDB" character varying(50),
    "SoThanhVien" integer,
    "MauAo" character varying(50),
    "Diem" integer,
    "MaNDK" character(5),
    "MaGD" character(5),
    "MaBD" character(5)
);


ALTER TABLE public."DoiBong" OWNER TO postgres;

--
-- Name: GiaiDau; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GiaiDau" (
    "MaGD" character(5) NOT NULL,
    "TenGD" character varying(50),
    "DoTuoiTGNhoNhat" integer,
    "DoTuoiTGLonNhat" integer,
    "SoDBThamGia" integer,
    "MaNV" character(5),
    "HanCuoiDangKy" timestamp
);


ALTER TABLE public."GiaiDau" OWNER TO postgres;

--
-- Name: NguoiDangKy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."NguoiDangKy" (
    "MaNDK" character(5) NOT NULL,
    "TenNDK" character varying(50),
    "SDT" character(10),
    "Email" character varying(40),
    "AnhNDK" character varying(50),
    "MatKhauNDK" character varying(200)
);


ALTER TABLE public."NguoiDangKy" OWNER TO postgres;

--
-- Name: NhanVien; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."NhanVien" (
    "MaNV" character(5) NOT NULL,
    "TenNV" character varying(50),
    "SDT_NV" character(10),
    "EmailNV" character varying(50),
    "AnhNV" character varying(50),
    "MatKhauNDK" character varying(200)
);


ALTER TABLE public."NhanVien" OWNER TO postgres;

--
-- Name: SanDau; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SanDau" (
    "MaSD" character(5) NOT NULL,
    "DiaChi" character varying(50)
);


ALTER TABLE public."SanDau" OWNER TO postgres;

--
-- Name: TranDau; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TranDau" (
    "MaTD" character(5) NOT NULL,
    "MaDB1" character(5),
    "MaDB2" character(5),
    "MaVD" character(5),
    "MaSD" character(5),
    "GioBatDau" time(6) without time zone,
    "NgThiDau" date,
    "DoiThang" character(5),
    "SoBanThangDB1" integer,
    "SoBanThangDB2" integer
);


ALTER TABLE public."TranDau" OWNER TO postgres;

--
-- Name: VongDau; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VongDau" (
    "MaVD" character(5) NOT NULL,
    "TenVD" character varying(20)
);


ALTER TABLE public."VongDau" OWNER TO postgres;

--
-- Name: NhanVien NhanVien_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NhanVien"
    ADD CONSTRAINT "NhanVien_pkey" PRIMARY KEY ("MaNV");


--
-- Name: BanThang PK__BanThang__2724759721B6055D; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BanThang"
    ADD CONSTRAINT "PK__BanThang__2724759721B6055D" PRIMARY KEY ("MaBT");


--
-- Name: BangDau PK__BangDau__272475A703317E3D; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BangDau"
    ADD CONSTRAINT "PK__BangDau__272475A703317E3D" PRIMARY KEY ("MaBD");


--
-- Name: CauThu PK__CauThu__27258E74164452B1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CauThu"
    ADD CONSTRAINT "PK__CauThu__27258E74164452B1" PRIMARY KEY ("MaCT");


--
-- Name: ChiTietTD PK__ChiTietT__CBAB1E461DE57479; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChiTietTD"
    ADD CONSTRAINT "PK__ChiTietT__CBAB1E461DE57479" PRIMARY KEY ("MaTD", "TGian");


--
-- Name: DoiBong PK__DoiBong__2725867B1273C1CD; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DoiBong"
    ADD CONSTRAINT "PK__DoiBong__2725867B1273C1CD" PRIMARY KEY ("MaDB");


--
-- Name: GiaiDau PK__GiaiDau__2725AE817F60ED59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GiaiDau"
    ADD CONSTRAINT "PK__GiaiDau__2725AE817F60ED59" PRIMARY KEY ("MaGD");


--
-- Name: NguoiDangKy PK__NguoiDan__3A1855900EA330E9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NguoiDangKy"
    ADD CONSTRAINT "PK__NguoiDan__3A1855900EA330E9" PRIMARY KEY ("MaNDK");


--
-- Name: SanDau PK__SanDau__272508080AD2A005; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SanDau"
    ADD CONSTRAINT "PK__SanDau__272508080AD2A005" PRIMARY KEY ("MaSD");


--
-- Name: TranDau PK__TranDau__272500691A14E395; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TranDau"
    ADD CONSTRAINT "PK__TranDau__272500691A14E395" PRIMARY KEY ("MaTD");


--
-- Name: VongDau PK__VongDau__2725102E07020F21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VongDau"
    ADD CONSTRAINT "PK__VongDau__2725102E07020F21" PRIMARY KEY ("MaVD");


--
-- Name: fki_FK_GiaiDau_NhanVien; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_FK_GiaiDau_NhanVien" ON public."GiaiDau" USING btree ("MaNV");


--
-- Name: BanThang FK_BanThang_CauThu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BanThang"
    ADD CONSTRAINT "FK_BanThang_CauThu" FOREIGN KEY ("MaCT") REFERENCES public."CauThu"("MaCT");


--
-- Name: BanThang FK_BanThang_TranDau; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BanThang"
    ADD CONSTRAINT "FK_BanThang_TranDau" FOREIGN KEY ("MaTD") REFERENCES public."TranDau"("MaTD");


--
-- Name: CauThu FK_CauThu_DoiBong; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CauThu"
    ADD CONSTRAINT "FK_CauThu_DoiBong" FOREIGN KEY ("MaDB") REFERENCES public."DoiBong"("MaDB");


--
-- Name: ChiTietTD FK_ChiTietTD_TranDau; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChiTietTD"
    ADD CONSTRAINT "FK_ChiTietTD_TranDau" FOREIGN KEY ("MaTD") REFERENCES public."TranDau"("MaTD");


--
-- Name: DoiBong FK_DoiBong_BangDau; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DoiBong"
    ADD CONSTRAINT "FK_DoiBong_BangDau" FOREIGN KEY ("MaBD") REFERENCES public."BangDau"("MaBD");


--
-- Name: DoiBong FK_DoiBong_GiaiDau; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DoiBong"
    ADD CONSTRAINT "FK_DoiBong_GiaiDau" FOREIGN KEY ("MaGD") REFERENCES public."GiaiDau"("MaGD");


--
-- Name: DoiBong FK_DoiBong_NguoiDangKy; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DoiBong"
    ADD CONSTRAINT "FK_DoiBong_NguoiDangKy" FOREIGN KEY ("MaNDK") REFERENCES public."NguoiDangKy"("MaNDK");


--
-- Name: GiaiDau FK_GiaiDau_NhanVien; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GiaiDau"
    ADD CONSTRAINT "FK_GiaiDau_NhanVien" FOREIGN KEY ("MaNV") REFERENCES public."NhanVien"("MaNV");


--
-- Name: TranDau FK_TranDau_DoiBong1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TranDau"
    ADD CONSTRAINT "FK_TranDau_DoiBong1" FOREIGN KEY ("MaDB1") REFERENCES public."DoiBong"("MaDB");


--
-- Name: TranDau FK_TranDau_DoiBong2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TranDau"
    ADD CONSTRAINT "FK_TranDau_DoiBong2" FOREIGN KEY ("MaDB2") REFERENCES public."DoiBong"("MaDB");


--
-- Name: TranDau FK_TranDau_DoiBong3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TranDau"
    ADD CONSTRAINT "FK_TranDau_DoiBong3" FOREIGN KEY ("DoiThang") REFERENCES public."DoiBong"("MaDB");


--
-- Name: TranDau FK_TranDau_SanDau; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TranDau"
    ADD CONSTRAINT "FK_TranDau_SanDau" FOREIGN KEY ("MaSD") REFERENCES public."SanDau"("MaSD");


--
-- Name: TranDau FK_TranDau_VongDau; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TranDau"
    ADD CONSTRAINT "FK_TranDau_VongDau" FOREIGN KEY ("MaVD") REFERENCES public."VongDau"("MaVD");


--
-- PostgreSQL database dump complete
--

