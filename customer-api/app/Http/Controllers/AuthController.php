<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
  public function login(Request $request)
  {
    // memberId と password は必須
    $request->validate([
      'memberId' => 'required',
      'password' => 'required',
    ]);

    // 認証チェック（DBと照合）
    if (!Auth::guard('web')->attempt($request->only('memberId', 'password'))) {
      return response()->json(['message' => '会員IDまたはパスワードが違います'], 401);
    }

    // 認証成功 → アクセストークン発行
    $user = Auth::guard('web')->user();
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
      'access_token' => $token,
      'token_type' => 'Bearer',
    ]);
  }
}
